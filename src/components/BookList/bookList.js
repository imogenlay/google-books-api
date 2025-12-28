export const getBooks = async () => {
    const response = await fetch("https://www.googleapis.com/books/v1/volumes?q=skulduggery+pleasant&maxResults=20");

    if (!response.ok) {
        console.error(await response.text());
        throw new Error('Failed to fetch books.');
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
