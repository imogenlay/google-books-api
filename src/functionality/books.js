
export const FETCH_STATUS = Object.freeze({
    pending: "PENDING",
    loading: "LOADING",
    fulfilled: "FULFILLED",
    failed: "FAILED",
});

export const getBooks = async (searchKeywords) => {
    const keywords = searchKeywords.split(" ").filter(Boolean).join("+");
    const response = await fetch("https://www.googleapis.com/books/v1/volumes?q=" + keywords +
        "&maxResults=18" +
        "&startIndex=" + 0);

    if (!response.ok) {
        console.error(await response.text());
        throw new Error("Failed to fetch books.");
    }

    const data = await response.json();
    console.log(data);

    if (data.items)
        return data.items.map((i) => {
            let imageThumbnail =
                i.volumeInfo.imageLinks?.smallThumbnail ||
                i.volumeInfo.imageLinks?.thumbnail ||
                "";

            return {
                id: i.id,
                title: i.volumeInfo.title || "",
                authors: i.volumeInfo.authors || [],
                description: i.volumeInfo.description || "",

                image: imageThumbnail,
                language: i.volumeInfo.language || "",
                pageCount: i.volumeInfo.pageCount || "",
                previewLink: i.volumeInfo.previewLink || "",
                publishedDate: i.volumeInfo.publishedDate || "",
            };
        });

    return [{
        id: "nope",
        title: "found nothing",
        authors: ["Nobody"],
        description: "nothing was found today",

        image: "",
        language: "",
        pageCount: "",
        previewLink: "",
        publishedDate: "",
    }];
};

export const createAuthorText = (book, isLoading) => {
    if (isLoading) return "...";
    if (book?.authors?.length > 0) return book.authors.join(", ");

    return "Unknown Authorship";
};