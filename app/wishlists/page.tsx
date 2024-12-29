import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

async function Wishlists() {
    const session = await getServerSession();

    if (!session) {
        redirect("/signin");
    }

    return (
        <div>
            <h1>Wishlists</h1>
        </div>
    );
}

export default Wishlists;
