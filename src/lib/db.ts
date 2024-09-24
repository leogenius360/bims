type FilterFunction<T> = (item: T, searchString: string, dropdownSelection: string[]) => boolean;

interface FilterAndPaginateResult<T> {
    filteredData: T[];
    paginatedData: T[];
    totalPages: number;
    dropdownSelectedString?: string;
}

interface FilterAndPaginateProps<T> {
    data: T[],
    modelSearchFields?: (keyof T)[],
    searchString: string,
    dropdownSelection: string[],
    itemsPerPage: number,
    currentPage: number,
    customFilterFunction?: FilterFunction<T>,
}

export function filterAndPaginate<T>({
    data,
    modelSearchFields,
    searchString,
    dropdownSelection,
    itemsPerPage,
    currentPage,
    customFilterFunction,
}: FilterAndPaginateProps<T>): FilterAndPaginateResult<T> {
    const dropdownSelectedString = dropdownSelection.join(", ").replaceAll("_", " ").toLowerCase();

    const filteredData = data.filter((item) => {
        const matchesCustomFilter = customFilterFunction ? customFilterFunction(item, searchString, dropdownSelection) : true;

        const matchesFields = modelSearchFields?.some((field) => {
            const value = item[field] as unknown as string | undefined;

            if (value) {
                const valueWords = value.toLowerCase().split(" ");
                const searchWords = searchString.toLowerCase().split(" ");

                // Check if all words in the searchString are in the value
                const allWordsMatch = searchWords.every((word) => valueWords.includes(word));

                // Check if the value is in dropdownSelectedString
                const dropdownMatch = dropdownSelectedString.includes(value.toLowerCase());

                return allWordsMatch || dropdownMatch;
            }

            return false;
        });

        return matchesFields && matchesCustomFilter;
    });

    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    return {
        filteredData,
        paginatedData,
        totalPages,
        dropdownSelectedString,
    };
}
