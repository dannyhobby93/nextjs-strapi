import Spoiler from "@/components/Spoiler";
import Testimonial from "@/components/Testimonial";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import Link from "next/link";
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
        <div>
            <div class="text-white relative bg-gray-700 px-14 py-16 -mx-8 -mt-7">
                <h2 className="text-6xl font-bold relative z-30">
                    {member.name}
                </h2>
                <img
                    className="object-cover absolute top-0 bottom-0 left-1/2 right-0 block w-1/2 h-full opacity-50 filter grayscale"
                    src={`http://localhost:1337${member.photo.url}`}
                />
                <div className="absolute z-20 w-80 bg-gradient-to-r from-gray-700 to-transparent h-full top-0 bottom-0 left-1/2"></div>
            </div>

            <div className="transform -translate-y-1/2">
                <Link
                    href="/team"
                    className="text-sm bg-gray-600 text-gray-400 hover:bg-gray-500 hover:text-gray-300 inline-block rounded-lg py-3 px-5"
                >
                    &laquo; Back to all team members
                </Link>
            </div>

            <div className="prose max-w-none">
                {member.bodyContent.map((item, index) => renderer(item, index))}
            </div>
        </div>
    );
}
