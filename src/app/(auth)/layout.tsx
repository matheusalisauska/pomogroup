
export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-col  mx-auto w-full container">
            {children}
        </div>
    );
}
