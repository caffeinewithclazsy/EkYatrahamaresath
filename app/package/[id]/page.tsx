import { notFound } from "next/navigation"
import { mockPackages } from "@/lib/mock-data"
import { PackageDetails } from "@/components/package-details"

export default async function PackagePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const pkg = mockPackages.find((p) => p.id === id)

  if (!pkg) {
    notFound()
  }

  return <PackageDetails package={pkg} />
}
