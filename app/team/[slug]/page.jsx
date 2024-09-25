import Spoiler from "@/components/Spoiler";
import Testimonial from "@/components/Testimonial";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
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

function renderer(item, index) {
    console.log(item);
    switch (item.__component) {
        case "features.testimonial":
            return <Testimonial data={item} key={index} />;
        case "features.spoiler":
            return <Spoiler data={item} key={index} />;
        case "features.rich-text":
            return <BlocksRenderer content={item.content} key={index} />;
    }
}

export default async function TeamMemberPage({ params }) {
    const member = await getTeamMember(params.slug);
    return (
        <div className="prose max-w-none">
            <h1 className="text-4xl font-bold mb-6 text-gray-700">
                {member.name}
            </h1>
            <div className="grid grid-cols-2 gap-4"></div>
            <div>
                {member.bodyContent.map((item, index) => renderer(item, index))}
            </div>
        </div>
    );
}
