import { Resend } from "resend";
import type { APIRoute } from "astro";

// Mark this endpoint as server-rendered (required for API routes)
export const prerender = false;

// Email configuration
const TO_EMAIL = "alexmartinez.mm98@gmail.com";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
  turnstileToken?: string;
}

// Validation helper
function validateFormData(data: unknown): data is ContactFormData {
  if (!data || typeof data !== "object") {
    return false;
  }

  const formData = data as Record<string, unknown>;

  return (
    typeof formData.name === "string" &&
    formData.name.trim().length > 0 &&
    formData.name.length <= 200 &&
    typeof formData.email === "string" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
    typeof formData.message === "string" &&
    formData.message.trim().length > 0 &&
    formData.message.length <= 5000
  );
}

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const runtimeEnv =
      (locals as { runtime?: { env?: Record<string, string | undefined> } })
        ?.runtime?.env ?? {};
    const importMetaEnv = import.meta.env as Record<string, string | undefined>;
    const nodeEnv =
      typeof process !== "undefined"
        ? (process.env as Record<string, string | undefined>)
        : {};

    // Check if API key is configured
    const apiKey =
      runtimeEnv.RESEND_API_KEY ??
      importMetaEnv.RESEND_API_KEY ??
      nodeEnv.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY is not configured");
      return new Response(
        JSON.stringify({
          success: false,
          error: "Server configuration error. Please try again later.",
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Initialize Resend client inside the handler
    const resend = new Resend(apiKey);
    const fromEmail =
      runtimeEnv.RESEND_FROM_EMAIL ??
      importMetaEnv.RESEND_FROM_EMAIL ??
      nodeEnv.RESEND_FROM_EMAIL ??
      "onboarding@resend.dev";

    // Parse request body with error handling
    let body;
    try {
      const text = await request.text();
      if (!text || text.trim().length === 0) {
        return new Response(
          JSON.stringify({
            success: false,
            error: "Request body is empty. Please fill out the form.",
          }),
          {
            status: 400,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }
      body = JSON.parse(text);
    } catch (parseError) {
      console.error("JSON parse error:", parseError);
      return new Response(
        JSON.stringify({
          success: false,
          error: "Invalid request format. Please try again.",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Validate form data
    if (!validateFormData(body)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Invalid form data. Please check your inputs and try again.",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Verify Turnstile token (skip in development mode)
    const isDevelopment = import.meta.env.DEV;

    if (!isDevelopment) {
      const turnstileSecret =
        runtimeEnv.TURNSTILE_SECRET_KEY ??
        importMetaEnv.TURNSTILE_SECRET_KEY ??
        nodeEnv.TURNSTILE_SECRET_KEY;

      if (turnstileSecret && body.turnstileToken) {
        // Skip verification for development bypass token
        if (body.turnstileToken === "dev-mode-bypass") {
          console.warn("Turnstile bypassed in development mode");
        } else {
          const turnstileResponse = await fetch(
            "https://challenges.cloudflare.com/turnstile/v0/siteverify",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                secret: turnstileSecret,
                response: body.turnstileToken,
              }),
            }
          );

          const turnstileData = await turnstileResponse.json();

          if (!turnstileData.success) {
            console.error("Turnstile verification failed:", turnstileData);
            return new Response(
              JSON.stringify({
                success: false,
                error: "Security verification failed. Please try again.",
              }),
              {
                status: 400,
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
          }
        }
      } else if (!body.turnstileToken) {
        // If Turnstile is configured but no token provided
        return new Response(
          JSON.stringify({
            success: false,
            error: "Security verification is required. Please try again.",
          }),
          {
            status: 400,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }
    } else {
      // In development, log that Turnstile is bypassed
      console.log("Turnstile verification skipped in development mode");
    }

    const { name, email, message } = body;

    // Send email via Resend
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: TO_EMAIL,
      replyTo: email,
      subject: `Portfolio Contact Form: Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4f46e5; border-bottom: 2px solid #4f46e5; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="margin-top: 20px;">
            <p><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p><strong>Email:</strong> <a href="mailto:${escapeHtml(
              email
            )}">${escapeHtml(email)}</a></p>
          </div>
          
          <div style="margin-top: 30px; padding: 15px; background-color: #f3f4f6; border-radius: 5px;">
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap; margin-top: 10px;">${escapeHtml(
              message
            )}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px;">
            <p>This message was sent from your portfolio contact form.</p>
            <p>Reply directly to this email to respond to ${escapeHtml(
              name
            )}.</p>
          </div>
        </div>
      `,
      text: `
New Contact Form Submission

Name: ${name}
Email: ${email}

Message:
${message}

---
This message was sent from your portfolio contact form.
Reply directly to this email to respond to ${name}.
      `,
    });

    // Handle Resend API errors
    if (error) {
      console.error("Resend API error:", error);
      return new Response(
        JSON.stringify({
          success: false,
          error: "Failed to send message. Please try again later.",
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Success response
    return new Response(
      JSON.stringify({
        success: true,
        message: "Message sent successfully!",
        id: data?.id,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    // Handle unexpected errors
    console.error("Unexpected error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    const errorStack = error instanceof Error ? error.stack : undefined;
    console.error("Error details:", { errorMessage, errorStack });

    return new Response(
      JSON.stringify({
        success: false,
        error: "An unexpected error occurred. Please try again later.",
        // Include error details in development
        ...(import.meta.env.DEV && { details: errorMessage }),
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};

// Helper function to escape HTML to prevent XSS
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}
