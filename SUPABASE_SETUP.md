# Supabase Authentication Setup Guide

This guide will help you set up Supabase authentication for BadgerSpace with email domain restrictions for `wisc.edu` addresses.

## Quick Setup

### 1. Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign in or create an account
3. Click "New Project"
4. Fill in the project details:
   - **Name**: BadgerSpace (or your preferred name)
   - **Database Password**: Choose a strong password
   - **Region**: Choose closest to your users
5. Click "Create new project"

### 2. Get Your API Keys

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (under "Project URL")
   - **anon/public key** (under "Project API keys")

### 3. Configure Environment Variables

1. Open the `.env.local` file in your project root
2. Replace the placeholder values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Configure Email Authentication in Supabase

1. In your Supabase dashboard, go to **Authentication** → **Providers**
2. Make sure **Email** is enabled
3. Configure email settings:
   - **Enable Email provider**: ON
   - **Confirm email**: ON (recommended for production)
   - **Secure email change**: ON (recommended)

### 5. Set Up Email Domain Restrictions (IMPORTANT)

To enforce the `wisc.edu` email restriction on the server side:

1. Go to **Database** → **SQL Editor** in your Supabase dashboard
2. Run this SQL to create a trigger function:

```sql
-- Function to validate wisc.edu email domains
CREATE OR REPLACE FUNCTION public.validate_wisc_email()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.email !~* '^[^@]+@([a-z0-9-]+\.)?wisc\.edu$' THEN
    RAISE EXCEPTION 'Only UW-Madison email addresses (@wisc.edu) are allowed';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to validate emails before insert
DROP TRIGGER IF EXISTS validate_wisc_email_trigger ON auth.users;
CREATE TRIGGER validate_wisc_email_trigger
  BEFORE INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_wisc_email();
```

This ensures that even if someone bypasses the frontend validation, only `wisc.edu` emails can be registered in the database.

### 6. Configure Email Templates (Optional)

Customize the email templates for better branding:

1. Go to **Authentication** → **Email Templates**
2. Customize these templates:
   - **Confirm signup**: Welcome email with verification link
   - **Invite user**: For manual user invitations
   - **Magic Link**: For passwordless login (if you want to enable this)
   - **Reset Password**: Password reset email

Add BadgerSpace branding to make emails recognizable.

### 7. Test Your Setup

1. Start your development server:
```bash
npm run dev
```

2. Navigate to `http://localhost:3000/signup`

3. Try signing up with:
   - ✅ Valid: `student@wisc.edu`
   - ✅ Valid: `student@cs.wisc.edu`
   - ❌ Invalid: `student@gmail.com`
   - ❌ Invalid: `student@uwmadison.edu`

4. Check your email for the confirmation link (if email confirmation is enabled)

5. Try logging in at `http://localhost:3000/login`

## Email Domain Validation

The app validates emails at two levels:

### Frontend Validation (Immediate Feedback)
- Located in `lib/utils.ts`
- Function: `isValidWiscEmail()`
- Regex pattern: `/^[^\s@]+@([a-z0-9-]+\.)?wisc\.edu$/i`
- Accepts:
  - `user@wisc.edu`
  - `user@cs.wisc.edu`
  - `user@library.wisc.edu`
  - Any subdomain of `wisc.edu`

### Backend Validation (Security)
- Database trigger in Supabase
- Prevents bypassing frontend validation
- Ensures data integrity

## Security Notes

1. **Never commit `.env.local`** - It's already in `.gitignore`
2. **Use email confirmation** in production to verify email ownership
3. **Enable RLS (Row Level Security)** policies in Supabase for your data tables
4. **Keep your anon key public** - It's designed to be public, but keep your service role key secret
5. **Monitor authentication** in Supabase dashboard under Authentication → Users

## Troubleshooting

### "Invalid API key" error
- Check that you copied the correct values from Supabase
- Ensure there are no extra spaces in your `.env.local`
- Restart the dev server after changing environment variables

### Email not sending
- Check Supabase logs in **Authentication** → **Logs**
- For development, Supabase provides a test SMTP
- For production, configure a custom SMTP provider in Settings → Auth

### Users can't sign up
- Check browser console for errors
- Verify the database trigger is installed correctly
- Check Supabase logs for authentication errors

## Production Deployment

When deploying to Vercel, Netlify, or other platforms:

1. Add environment variables in your hosting platform's dashboard
2. Use the same `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Update the email redirect URL in Supabase:
   - Go to **Authentication** → **URL Configuration**
   - Add your production domain to **Redirect URLs**

## Additional Features

### Enable Password Recovery
Already configured! Users can reset passwords at `/login` (you may want to add a "Forgot Password" link)

### Add Social Login (Optional)
You can add Google, GitHub, etc. in **Authentication** → **Providers**

### User Profiles
Consider creating a `profiles` table to store additional user information:
```sql
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  full_name TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Resources

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Next.js Supabase Guide](https://supabase.com/docs/guides/auth/server-side/nextjs)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
