import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Recipes',
        href: '/recipes',
    },
];

export default function Index() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Recipes" />

            <div className="p-4">
                <Link href="/recipes/create" prefetch>
                    <Button>Create a recipe</Button>
                </Link>
            </div>
        </AppLayout>
    );
}
