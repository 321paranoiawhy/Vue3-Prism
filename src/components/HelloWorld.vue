<template>
    <Vue3Prism
        source="function bubbleSortFromStartToEnd(array) {
    const { length } = array;
    for (let i = 0; i < length - 1; i++) {
        for (let j = 0; j < length - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
            }
        }
    }
    return array;
}"
    ></Vue3Prism>
</template>

<script>
export default {
    name: "HelloWorld",
};
</script>
