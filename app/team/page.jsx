import Link from "next/link";

async function getTeamMembers() {
    const members = await fetch(
        "http://localhost:1337/api/team-members?populate=*"
    );
    const json = await members.json();

    return json.data;
}

export default async function Team() {
    const members = await getTeamMembers();

    return (
        <div>
            <h1 className="text-4xl mb-6 font-bold text-gray-700">Our Team</h1>
            <div className="grid grid-cols-2 gap-6">
                {members.map((member) => {
                    return (
                        <Link
                            className="group grid grid-cols-[140px_1fr] bg-white shadow rounded-lg overflow-hidden relative hover:bg-gradient-to-r from-white to-blue-50"
                            key={member.id}
                            href={`/team/${member.slug}`}
                        >
                            <div className="relative overflow-hidden">
                                <img
                                    className="transition duration-300 absolute inset-0 h-full w-full object-cover group-hover:scale-125"
                                    src={`http://localhost:1337${member.photo.url}`}
                                />
                            </div>

                            <div className="p-4">
                                <p className="text-xl text-gray-600 font-bold group-hover:text-gray-700">
                                    {member.name}
                                </p>
                                <p class="text-sm text-gray-500 leading-6">
                                    {member.description}
                                </p>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
