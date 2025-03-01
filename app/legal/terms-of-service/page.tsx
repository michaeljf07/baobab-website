function TermsOfService() {
    return (
        <main className="max-w-3xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
            <p className="text-gray-700">Effective Date: February 16th, 2025</p>

            <section className="mt-6">
                <h2 className="text-xl font-semibold">1. Use of Our Service</h2>
                <p>
                    Our website provides Amazon product search results through
                    third-party APIs.
                </p>
                <p>
                    We do not sell any products directly; all purchases are made
                    through Amazon or other third-party sellers.
                </p>
                <p>
                    We may modify or discontinue our services at any time
                    without notice.
                </p>
            </section>

            <section className="mt-4">
                <h2 className="text-xl font-semibold">
                    2. Affiliate Disclosure
                </h2>
                <p>
                    We participate in the Amazon Associates Program and other
                    affiliate programs. This means we earn a commission when you
                    click on affiliate links and make purchases.
                </p>
                <p>
                    Amazon and other affiliates may track your interactions
                    using cookies.
                </p>
            </section>

            <section className="mt-4">
                <h2 className="text-xl font-semibold">
                    3. Limitations of Liability
                </h2>
                <p>
                    We do not guarantee the accuracy, availability, or
                    completeness of product data.
                </p>
                <p>
                    We are not responsible for issues arising from third-party
                    purchases, including defective products, shipping delays, or
                    returns.
                </p>
                <p>
                    Our website is provided &quot;as is,&quot; without
                    warranties of any kind.
                </p>
            </section>

            <section className="mt-4">
                <h2 className="text-xl font-semibold">
                    4. User Responsibilities
                </h2>
                <p>
                    You agree not to misuse our service, including attempting to
                    scrape data, reverse engineer, or abuse our API.
                </p>
                <p>
                    Any violation of these Terms may result in termination of
                    access to our website.
                </p>
            </section>

            <section className="mt-4">
                <h2 className="text-xl font-semibold">5. Changes to Terms</h2>
                <p>
                    We may update these Terms at any time. Continued use of the
                    website after updates means you accept the new Terms.
                </p>
            </section>

            <section className="mt-4">
                <h2 className="text-xl font-semibold">6. Contact Us</h2>
                <p>
                    For any questions about these Terms, please contact us at{" "}
                    <a
                        href="mailto:outreach.baobab@gmail.com"
                        className="text-blue-500">
                        outreach.baobab@gmail.com
                    </a>
                    .
                </p>
            </section>
        </main>
    );
}

export default TermsOfService;
