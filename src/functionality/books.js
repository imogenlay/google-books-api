
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
        return data.items.map((item, i) => {
            let imageThumbnail =
                item.volumeInfo.imageLinks?.smallThumbnail ||
                item.volumeInfo.imageLinks?.thumbnail ||
                "";

            return {
                id: item.id,
                title: item.volumeInfo.title || "",
                authors: item.volumeInfo.authors || [],
                description: item.volumeInfo.description || "",

                image: imageThumbnail,
                language: item.volumeInfo.language || "",
                pageCount: item.volumeInfo.pageCount || "",
                previewLink: item.volumeInfo.previewLink || "",
                publishedDate: item.volumeInfo.publishedDate || "",
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