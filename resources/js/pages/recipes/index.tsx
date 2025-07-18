import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Recipes',
        href: '/recipes',
    },
];

interface Recipe {
    id: number;
    title: string;
    ingredients: string;
}

export default function Index({ ...props }: { recipes: Recipe[] }) {
    const { recipes } = props;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Recipes" />

            <div className="p-4">
                <Link href="/recipes/create" prefetch>
                    <Button>Create a recipe</Button>
                </Link>
            </div>

            <div>
                <Table>
                    <TableCaption>A list of your recent recipes.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">ID</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead className="text-center">Ingredients</TableHead>
                            <TableHead className="text-center">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {recipes.map((recipe) => (
                            <TableRow key={recipe.id}>
                                <TableCell className="w-[100px]">{recipe.id}</TableCell>
                                <TableCell className="max-w-[200px] px-1">{recipe.title}</TableCell>
                                <TableCell>
                                    <div className='className="max-h-24 break-words" overflow-y-auto whitespace-pre-wrap'>{recipe.ingredients}</div>
                                </TableCell>
                                <TableCell>
                                    <Link href={`/recipes/${recipe.id}/edit`} className="mr-2" prefetch>
                                        <Button>Edit</Button>
                                    </Link>
                                    <Button>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </AppLayout>
    );
}
