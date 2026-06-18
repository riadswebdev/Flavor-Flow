"use client";

import { Button, Input, TextArea, toast } from "@heroui/react";
import { Mail, MapPin, Phone, Clock, Send } from "lucide-react";

export default function ContactSection() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Static handling
    toast("Message recorded! Thank you for contacting FlavorFlow.");
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-default-100/80">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-500 text-xs font-semibold tracking-wide">
          Get In Touch
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Have Questions? We`d Love to{" "}
          <span className="bg-linear-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent">
            Hear From You
          </span>
        </h2>
        <p className="text-foreground/60 text-sm sm:text-medium">
          Whether you have feedback regarding features, queries about premium
          Stripe payments, or simply want to report platform misbehavior—drop us
          a message!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Side: Contact Information Blocks */}
        <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-foreground">
              Contact Information
            </h3>
            <p className="text-sm text-foreground/60 leading-relaxed">
              Reach out via our structural communication lines. Our moderate
              administration crew will evaluate platform inquiries efficiently.
            </p>
          </div>

          <div className="space-y-6 my-6 lg:my-0">
            {/* Box 1 */}
            <div className="flex items-start gap-4 p-4 rounded-xl border border-default-100 bg-default-50/40">
              <div className="p-3 rounded-lg bg-orange-500/10 text-orange-500">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-xs text-foreground/50 font-medium">
                  Email Us
                </p>
                <p className="text-sm font-semibold text-foreground">
                  support@flavorflow.com
                </p>
              </div>
            </div>

            {/* Box 2 */}
            <div className="flex items-start gap-4 p-4 rounded-xl border border-default-100 bg-default-50/40">
              <div className="p-3 rounded-lg bg-rose-500/10 text-rose-500">
                <Phone size={20} />
              </div>
              <div>
                <p className="text-xs text-foreground/50 font-medium">
                  Call Infrastructure
                </p>
                <p className="text-sm font-semibold text-foreground">
                  +1 (555) 234-5678
                </p>
              </div>
            </div>

            {/* Box 3 */}
            <div className="flex items-start gap-4 p-4 rounded-xl border border-default-100 bg-default-50/40">
              <div className="p-3 rounded-lg bg-orange-500/10 text-orange-500">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-xs text-foreground/50 font-medium">
                  HQ Address
                </p>
                <p className="text-sm font-semibold text-foreground">
                  101 Culinary Blvd, Suite 400, NY
                </p>
              </div>
            </div>

            {/* Box 4 */}
            <div className="flex items-start gap-4 p-4 rounded-xl border border-default-100 bg-default-50/40">
              <div className="p-3 rounded-lg bg-rose-500/10 text-rose-500">
                <Clock size={20} />
              </div>
              <div>
                <p className="text-xs text-foreground/50 font-medium">
                  Support Hours
                </p>
                <p className="text-sm font-semibold text-foreground">
                  Mon - Fri: 9:00 AM - 6:00 PM EST
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Form Wrapper Container */}
        <div className="lg:col-span-7 p-8 sm:p-10 rounded-2xl border border-default-200/50 bg-background/40 backdrop-blur-md shadow-xl shadow-default-100/10">
          <form
            onSubmit={handleSubmit}
            className="space-y-6 w-full text-foreground"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                type="text"
                label="Full Name"
                placeholder="Jane Doe"
                variant="bordered"
                radius="xl"
                required
                className="w-full"
              />
              <Input
                type="email"
                label="Email Address"
                placeholder="jane.doe@example.com"
                variant="bordered"
                radius="xl"
                required
                className="w-full"
              />
            </div>

            <Input
              type="text"
              label="Subject"
              placeholder="How can we assist your culinary dashboard?"
              variant="bordered"
              radius="xl"
              required
              className="w-full"
            />

         
            <TextArea
              label="Your Message"
              placeholder="Type your message description thoroughly..."
              variant="bordered"
              radius="xl"
              rows={4}
              required
              className="w-full"
            />

         
            <Button
              type="submit"
              color="warning"
              radius="xl"
              endContent={<Send size={16} />}
              className="w-full sm:w-auto font-medium bg-linear-to-r from-orange-500 to-rose-500 text-white shadow-lg shadow-orange-500/20 hover:opacity-95 transition-all"
            >
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
