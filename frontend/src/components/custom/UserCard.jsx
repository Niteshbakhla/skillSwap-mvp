import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const UserCard = ({ user }) => {
            const handleSendRequest = () => {
                        // later connect to backend
                        alert(`Request sent to ${user.name}!`);
            };

            return (
                        <Card className="shadow-sm hover:shadow-md transition-all">
                                    <CardHeader>
                                                <CardTitle className="flex items-center gap-3">
                                                            <div className="w-10 h-10 bg-primary/10 text-primary flex items-center justify-center rounded-full font-bold">
                                                                        {user.name[0]}
                                                            </div>
                                                            <span>{user.name}</span>
                                                </CardTitle>
                                    </CardHeader>

                                    <CardContent>
                                                <div className="mb-2">
                                                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Offers:</p>
                                                            <div className="flex flex-wrap gap-2">
                                                                        {user.skillsOffer.map((skill, i) => (
                                                                                    <span
                                                                                                key={i}
                                                                                                className="bg-green-100 text-green-700 px-2 py-1 rounded-md text-xs"
                                                                                    >
                                                                                                {skill}
                                                                                    </span>
                                                                        ))}
                                                            </div>
                                                </div>

                                                <div className="mb-4">
                                                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Wants:</p>
                                                            <div className="flex flex-wrap gap-2">
                                                                        {user.skillsWant.map((skill, i) => (
                                                                                    <span
                                                                                                key={i}
                                                                                                className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-xs"
                                                                                    >
                                                                                                {skill}
                                                                                    </span>
                                                                        ))}
                                                            </div>
                                                </div>

                                                <Button
                                                            onClick={handleSendRequest}
                                                            className="w-full"
                                                >
                                                            Send Request
                                                </Button>
                                    </CardContent>
                        </Card>
            );
};

export default UserCard;
