export default function Testimonial({ data }) {
    return (
        <div className="bg-gray-200 rounded-lg py-6 px-16 pb-20 not-prose mb-24 relative text-center">
            <p className="text-2xl italic text-gray-600">
                &ldquo;{data.quote}&rdquo;
            </p>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                <img
                    className="w-32 h-32 rounded-full border-4 border-gray-200"
                    src={`http://localhost:1337${data.photo.url}`}
                    alt={data.author}
                />
                <h4 className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-gray-200 shadow px-3 py-2 text-sm font-bold rounded-full text-gray-800">
                    {data.author}
                </h4>
            </div>
        </div>
    );
}
