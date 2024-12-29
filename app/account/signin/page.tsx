import SignIn from "@/components/signin-form";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

function Login() {
    return (
        <div>
            <title>Authentication</title>
            <Navbar />
            <SignIn />
            <Footer />
        </div>
    );
}

export default Login;
