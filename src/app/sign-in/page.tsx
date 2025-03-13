import { getSession } from "../../lib/auth";
import { redirect } from "next/navigation";
import { auth } from "./actions";

interface Props {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function SignIn(props: Props) {
    const searchParams = await props.searchParams;
    const session = await getSession();

    if (session.isAuthenticated) {
        redirect("/admin");
    }

    return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form action={auth} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
            <input
                name="redirect"
                type="hidden"
                defaultValue={searchParams.redirect}
            />
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
                <input 
                name="password" 
                type="password" 
                required 
                autoFocus
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            </label>
        </div>
            <button className="w-full bg-blue-500 hover:bg-blue-600 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Sign in</button>
        </form>
    </div>
    );
}