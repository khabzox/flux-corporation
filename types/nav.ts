export interface TopNavigationProps {
    currentView: string
    onViewChange: (view: string) => void
    onAddContent: () => void
    selectedFilters: string[]
    onFiltersChange: (filters: string[]) => void
}
