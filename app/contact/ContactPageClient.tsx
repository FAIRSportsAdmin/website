"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, CheckCircle, Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import { slideInFromLeft, slideInFromRight } from "@/lib/animations"
import { PageLayout } from "@/components/layout/page-layout"

interface FormData {
  firstName: string
  lastName: string
  email: string
  message: string
}

interface FormErrors {
  firstName?: string
  lastName?: string
  email?: string
  message?: string
}

export default function ContactPageClient() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required"
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required"
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/form/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname: formData.firstName,
          lastname: formData.lastName,
          email: formData.email,
          message: formData.message,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit contact form")
      }

      setIsSubmitted(true)

      // Reset form after success
      setTimeout(() => {
        setFormData({ firstName: "", lastName: "", email: "", message: "" })
        setIsSubmitted(false)
      }, 3000)
    } catch (error) {
      console.error("Error submitting contact form:", error)
      // Show error to user - for now just log it
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  if (isSubmitted) {
    return (
      <PageLayout title="Message Sent!" background="gray-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto text-center"
        >
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-navy mb-4">Thank You!</h2>
            <p className="text-gray-600 mb-6">
              Your message has been sent successfully. We'll get back to you within 24 hours.
            </p>
          </div>
        </motion.div>
      </PageLayout>
    )
  }

  return (
    <PageLayout
      title="Contact Us"
      description="Ready to resolve your dispute? Get in touch with our team of experts."
      background="gray-50"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <motion.div variants={slideInFromLeft}>
          <Card className="bg-white shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-navy">Send us a message</CardTitle>
              <CardDescription className="text-gray-600 text-sm">
                Fill out the form below and we'll get back to you within 24 hours.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-navy mb-2">
                      First Name *
                    </label>
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`border-gray-300 focus:border-accord ${errors.firstName ? "border-red-500" : ""}`}
                      disabled={isSubmitting}
                    />
                    {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-navy mb-2">
                      Last Name *
                    </label>
                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`border-gray-300 focus:border-accord ${errors.lastName ? "border-red-500" : ""}`}
                      disabled={isSubmitting}
                    />
                    {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-navy mb-2">
                    Email Address *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`border-gray-300 focus:border-accord ${errors.email ? "border-red-500" : ""}`}
                    disabled={isSubmitting}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-navy mb-2">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className={`border-gray-300 focus:border-accord resize-none ${errors.message ? "border-red-500" : ""}`}
                    placeholder="Please describe your dispute or inquiry..."
                    disabled={isSubmitting}
                  />
                  {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full bg-accord hover:bg-accord/90 text-white font-bold py-3 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Sending Message...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </Button>

                <p className="text-sm text-gray-500 text-center">
                  * Submitting this form does not create an attorney-client relationship.
                </p>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Simplified Contact Information */}
        <motion.div variants={slideInFromRight}>
          <Card className="bg-white shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-navy">Get in Touch</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start">
                <Mail className="w-5 h-5 text-accord mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-navy text-sm">Email</h3>
                  <p className="text-gray-600 text-sm">admin@fairsports.org</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </PageLayout>
  )
}
