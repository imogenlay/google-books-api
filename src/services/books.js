
export const FETCH_STATUS = Object.freeze({
    pending: "PENDING",
    loading: "LOADING",
    fulfilled: "FULFILLED",
    failed: "FAILED",
});

export const getBooks = async (searchKeywords, searchPage) => {
    const NUMBER_PER_PAGE = 18;

    const keywords = searchKeywords.split(" ").filter(Boolean).join("+");
    const response = await fetch("https://www.googleapis.com/books/v1/volumes?q=" + keywords +
        "&maxResults=" + NUMBER_PER_PAGE +
        "&startIndex=" + (NUMBER_PER_PAGE * searchPage));

    if (!response.ok) {
        console.error(await response.text());
        throw new Error("Failed to fetch books.");
    }

    const data = await response.json();

    if (!data.items)
        throw new Error("Book data did not contain item list.");

    // console.log(data);
    return data.items.map((item) => {
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

};

export const createAuthorText = (book, isLoading) => {
    if (isLoading) return "...";
    if (book?.authors?.length > 0) return book.authors.join(", ");

    return "Unknown Authorship";
};