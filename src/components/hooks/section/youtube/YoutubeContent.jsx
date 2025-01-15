import React from "react";

export default function YoutubeContent({ videos }) {

    return <section>
        {
            videos.map((item, index) => {
                return (
                    <div key={index}>
                        <h1>{item.title}</h1>
                    </div>
                )
            })
        }
    </section>;
}