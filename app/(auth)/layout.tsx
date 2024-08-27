const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-full  h-screen flex items-center justify-center    ">
      {children}
    </div>
  )
}

export default AuthLayout

// text: bg-clip-text bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-300 via-yellow-100 to-orange-900
