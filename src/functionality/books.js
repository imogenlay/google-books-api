
export const FETCH_STATUS = Object.freeze({
    pending: "PENDING",
    loading: "LOADING",
    fulfilled: "FULFILLED",
    failed: "FAILED",
});

export const getBooks = async (searchKeywords) => {
    const keywords = searchKeywords.split(" ").filter(Boolean).join("+");
    const response = await fetch("https://www.googleapis.com/books/v1/volumes?q=" + keywords +
        "&maxResults=24" + // Will produce an even count for 2 per row, 4 per row, 6 per row.
        // Doesn't seem to return anything over 20 for some reason.
        "&startIndex=" + 20);

    if (!response.ok) {
        console.error(await response.text());
        throw new Error("Failed to fetch books.");
    }
    const data = await response.json();
    console.log(data);

    return data.items.map((i) => {
        let imageThumbnail =
            i.volumeInfo.imageLinks?.smallThumbnail ||
            i.volumeInfo.imageLinks?.thumbnail || "";

        return {
            id: i.id,
            title: i.volumeInfo.title,
            authors: i.volumeInfo.authors || [],
            description: i.volumeInfo.description,
            image: imageThumbnail,
        };
    });
};
