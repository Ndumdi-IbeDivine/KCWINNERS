export default function formatedDate(dateToFormat: string): string {
    const date = new Date(dateToFormat);

    const formattedDate = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return formattedDate;
}
