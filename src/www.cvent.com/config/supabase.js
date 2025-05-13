import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// Use your actual credentials or inject them at build time
const supabaseUrl = 'https://safbfckhqjlbnjhvrlgj.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhZmJmY2tocWpsYm5qaHZybGdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5OTgyMDAsImV4cCI6MjA2MjU3NDIwMH0.yttkLCXdMhz0kw5HoHoIMYdvARbzZ07hSmbaV25-GDM'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Helper function to generate unique filename
function generateUniqueFilename(originalName) {
  const timestamp = Date.now()
  const randomString = Math.random().toString(36).substring(2, 8)
  const extension = originalName.split('.').pop()
  return `${timestamp}-${randomString}.${extension}`
}

// Create a new admin account
export async function createAdminAccount(email, password, name) {
  try {
    // Create the user account with metadata - the trigger will create the profile
    const { data: { user }, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name,
          role: 'admin'
        }
      }
    })
    
    if (signUpError) throw signUpError

    return { 
      success: true, 
      message: 'Admin account created successfully! Please check your email to confirm your account.' 
    }
  } catch (error) {
    console.error('Create admin error:', error.message)
    throw new Error('Failed to create admin account: ' + error.message)
  }
}

// Login and redirect based on role
export async function loginAndRedirect(email, password) {
  try {
    const { data: { user }, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()
    
    if (profileError) throw profileError
    
    if (profile.role === 'admin') {
      window.location.href = '/admin.html'
    } else {
      window.location.href = '/dashboard.html'
    }
  } catch (error) {
    console.error('Login error:', error.message)
    throw error
  }
}

// Upload image and get public URL
export async function uploadCaseStudyImage(file) {
  try {
    if (!file) return null
    
    // Generate unique filename
    const uniqueFilename = generateUniqueFilename(file.name)
    const filePath = `case-studies/${uniqueFilename}`
    
    // Upload file
    const { data, error: uploadError } = await supabase.storage
      .from('public-images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      })
    
    if (uploadError) throw uploadError
    
    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('public-images')
      .getPublicUrl(filePath)
    
    return publicUrl
  } catch (error) {
    console.error('Upload error:', error.message)
    throw new Error('Failed to upload image. Please try again.')
  }
}

// Helper function to check if user is admin
export async function isAdmin() {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return false
    
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()
    
    return profile?.role === 'admin'
  } catch (error) {
    console.error('Admin check error:', error.message)
    return false
  }
} 