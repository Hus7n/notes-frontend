import { DashboardNav } from "@/components/layout/dashboard-nav";
import { DashboardView } from "@/components/notes/dashboard-view";

export default function PinnedNotesPage(){
    return(
        <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-white">Pinned Notes</h2>
        <p className="mt-1 text-sm text-glass-muted">Your most important notes</p>
      </div>
      <DashboardNav />
      <DashboardView
        section="pinned"
        emptyTitle="No pinned notes"
        emptyDescription="Pin important notes to find them quickly."
      />
    </div>
    )
}