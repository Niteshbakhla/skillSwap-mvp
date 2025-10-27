import { useState } from "react";
import { Input } from "@/components/ui/input";
import UserCard from "@/components/custom/UserCard";

const Home = () => {
            const [search, setSearch] = useState("");

            // Dummy users (replace later with backend data)
            const [users, setUsers] = useState([
                        {
                                    _id: "1",
                                    name: "Aman Singh",
                                    avatarUrl: "",
                                    skillsOffer: ["React", "Node.js"],
                                    skillsWant: ["Guitar", "Singing"],
                        },
                        {
                                    _id: "2",
                                    name: "Riya Sharma",
                                    avatarUrl: "",
                                    skillsOffer: ["Cooking", "Yoga"],
                                    skillsWant: ["UI Design", "HTML"],
                        },
                        {
                                    _id: "3",
                                    name: "Aditya Patel",
                                    avatarUrl: "",
                                    skillsOffer: ["C++", "DSA"],
                                    skillsWant: ["Photography", "Video Editing"],
                        },
            ]);

            const filtered = users.filter(
                        (u) =>
                                    u.skillsOffer.some((s) =>
                                                s.toLowerCase().includes(search.toLowerCase())
                                    ) ||
                                    u.skillsWant.some((s) =>
                                                s.toLowerCase().includes(search.toLowerCase())
                                    ) ||
                                    u.name.toLowerCase().includes(search.toLowerCase())
            );

            return (
                        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
                                    {/* Header */}
                                    <div className="flex items-center justify-between mb-6">
                                                <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                                                            Explore People 🔍
                                                </h1>
                                    </div>

                                    {/* Search */}
                                    <div className="flex justify-center mb-8">
                                                <Input
                                                            placeholder="Search by name or skill..."
                                                            value={search}
                                                            onChange={(e) => setSearch(e.target.value)}
                                                            className="max-w-md"
                                                />
                                    </div>

                                    {/* Feed Grid */}
                                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                                {filtered.length > 0 ? (
                                                            filtered.map((user) => <UserCard key={user._id} user={user} />)
                                                ) : (
                                                            <p className="text-gray-500 dark:text-gray-400">
                                                                        No users found for “{search}”.
                                                            </p>
                                                )}
                                    </div>
                        </div>
            );
};

export default Home;
