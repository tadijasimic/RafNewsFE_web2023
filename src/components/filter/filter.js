import {ref} from "vue";

const filterExpanded = ref(false)
const selectedCategory = ref(null)
const dateOrder = ref('asc')

const trending = ref(false)

function isTrending() {
    return trending.value
}

const pageSize = ref(10)

const tagSearch = ref('')

export {filterExpanded, selectedCategory, dateOrder, trending, isTrending, pageSize, tagSearch}