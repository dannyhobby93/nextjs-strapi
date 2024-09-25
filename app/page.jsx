import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import React from "react";

async function getContent() {
    const res = await fetch("http://localhost:1337/api/home");
    const { data } = await res.json();
    return data.content;
}

export default async function Page() {
    const content = await getContent();

    return (
        <div>
            <BlocksRenderer content={content} />
        </div>
    );
}
