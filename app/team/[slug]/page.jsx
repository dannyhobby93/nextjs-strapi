import qs from "qs";

async function getTeamMember(slug) {
    const query = qs.stringify({
        filters: {
            slug: slug,
        },
        populate: {
            photo: "*",
            bodyContent: {
                on: {
                    "features.rich-text": {
                        populate: "*",
                    },
                    "features.spoiler": {
                        populate: "*",
                    },
                    "features.testimonial": {
                        populate: "*",
                    },
                },
            },
        },
    });

    const member = await fetch(
        `http://localhost:1337/api/team-members?${query}`
    );

    const json = await member.json();

    return json.data[0];
}

export default async function TeamMemberPage({ params }) {
    const member = await getTeamMember(params.slug);
    console.log(member);
    return <div className="prose max-w-none"></div>;
}
