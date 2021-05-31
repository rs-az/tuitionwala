import Link from "next/link";
import { useRouter } from "next/router";
const Header = () => {
	const router = useRouter();
	const toggleMenu = () => {
		const menu = document.querySelector(".menu");
		menu.classList.toggle("hidden");
	};

	return (
		<header className="">
			<div className="bg-gradient-to-b from-blue-500 to-blue-400 w-full flex space-x-2 justify-between text-white px-12 py-6">
				<Link href="/">
					<a className="flex space-x-2 items-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-10 w-10"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
							/>
						</svg>
						<h1 className="text-2xl font-bold">TuitionWala</h1>
					</a>
				</Link>
				<button
					className="text-white block focus:outline-none md:hidden"
					onClick={() => toggleMenu()}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-4 w-4"
						viewBox="0 0 20 20"
						fill="currentColor"
						className="h-10 w-10"
					>
						<path
							fillRule="evenodd"
							d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
							clipRule="evenodd"
						/>
					</svg>
				</button>
				<div className="space-x-4 items-center hidden md:flex">
					<nav>
						<ul className="flex space-x-3 justify-between items-center">
							<li className={router.pathname == "/" ? "active" : ""}>
								<Link href="/">
									<a className="px-3 py-2 rounded hover:bg-blue-500">Home</a>
								</Link>
							</li>

							<li className={router.pathname == "/jobs" ? "active" : ""}>
								<Link href="/jobs">
									<a className="px-3 py-2 rounded hover:bg-blue-500">Jobs</a>
								</Link>
							</li>

							<li className={router.pathname == "/instructors" ? "active" : ""}>
								<Link href="/instructors">
									<a className="px-3 py-2 rounded hover:bg-blue-500">
										Instructors
									</a>
								</Link>
							</li>

							<li className={router.pathname == "/contact" ? "active" : ""}>
								<Link href="/contact">
									<a className="px-3 py-2 rounded hover:bg-blue-500">Contact</a>
								</Link>
							</li>
						</ul>
					</nav>
					<div className="flex space-x-3 items-center">
						<Link href="/login">
							<a className="border border-white rounded text-white px-3 py-1 focus:outline-none">
								Login
							</a>
						</Link>
						<Link href="/signup">
							<a className="bg-yellow-500 rounded px-3 py-1 focus:outline-none">
								Signup
							</a>
						</Link>
					</div>
				</div>
			</div>
			<div className="hidden menu md:hidden">
				<nav className="bg-blue-400 text-white pb-4">
					<ul className="flex flex-col space-y-3 justify-between items-center">
						<li
							className={`w-full ${
								router.pathname == "/" ? "active-head" : ""
							}`}
						>
							<Link href="/">
								<a className="block hover:bg-blue-500 text-center">Home</a>
							</Link>
						</li>

						<li
							className={`w-full ${
								router.pathname == "/jobs" ? "active-head" : ""
							}`}
						>
							<Link href="/jobs">
								<a className="block hover:bg-blue-500 text-center">Jobs</a>
							</Link>
						</li>

						<li
							className={`w-full ${
								router.pathname == "/instructors" ? "active-head" : ""
							}`}
						>
							<Link href="/instructors">
								<a className="block hover:bg-blue-500 text-center">
									Instructors
								</a>
							</Link>
						</li>

						<li
							className={`w-full ${
								router.pathname == "/contact" ? "active-head" : ""
							}`}
						>
							<Link href="/contact">
								<a className="block hover:bg-blue-500 text-center">Contact</a>
							</Link>
						</li>

						<li
							className={`w-full ${
								router.pathname == "/login" ? "active-head" : ""
							}`}
						>
							<Link href="/login">
								<a className="block hover:bg-blue-500 text-center">Login</a>
							</Link>
						</li>

						<li
							className={`w-full ${
								router.pathname == "/signup" ? "active-head" : ""
							}`}
						>
							<Link href="/signup">
								<a className="block hover:bg-blue-500 text-center">Signup</a>
							</Link>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	);
};

export default Header;
