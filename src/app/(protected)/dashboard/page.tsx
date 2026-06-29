import { DashboardNav } from "@/components/layout/dashboard-nav";
import { DashboardView } from "@/components/notes/dashboard-view";

export default function MyNotesPage(){
    return(
        <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-white">My Notes</h2>
        <p className="mt-1 text-sm text-glass-muted">Your personal collection</p>
      </div>
      <DashboardNav />
      <DashboardView
        section="mine"
        emptyTitle="No notes yet"
        emptyDescription="Create your first note to get started."
      />
    </div>
    )
}