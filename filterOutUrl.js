function filterFromURl(url) {
    let searchQuery = (new URL(url)).searchParams;
    let workFlowData = searchQuery.get("active");
    if (workFlowData != null && workFlowData.length > 1) {
        return workFlowData;
    }
}

export default filterFromURl;