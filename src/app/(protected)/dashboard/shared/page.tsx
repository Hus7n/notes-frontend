import { DashboardNav } from "@/components/layout/dashboard-nav";
import { DashboardView } from "@/components/notes/dashboard-view";

export default function SharedNotesPage(){
    return(
        <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-white">Shared With Me</h2>
        <p className="mt-1 text-sm text-glass-muted">Notes others have shared with you</p>
      </div>
      <DashboardNav />
      <DashboardView
        section="shared"
        emptyTitle="Nothing shared with you"
        emptyDescription="Notes shared by other users will appear here."
      />
    </div>
    )
}