import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';

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
    instructions: string;
    description: string;
    image_url: string; // Assuming image is a URL or null if not set
}

const deleteRecipe = (id: number) => {
    // Logic to delete the recipe
    console.log(`Deleting recipe with ID: ${id}`);
    if (!confirm('Are you sure you want to delete this recipe?')) {
        return;
    }
    router.delete(route('recipes.destroy', id), {
        onSuccess: () => console.log('Recipe deleted successfully'),
        onError: (error) => console.error('Error deleting recipe:', error),
    });
};

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
                            <TableHead className="text-center">Thumbnail</TableHead>
                            <TableHead className="text-center">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {recipes.map((recipe) => (
                            <TableRow key={recipe.id}>
                                <TableCell className="w-[100px]">{recipe.id}</TableCell>
                                <TableCell className="max-w-[200px] px-1">{recipe.title}</TableCell>
                                <TableCell>
                                    <div className="flex justify-center">
                                        {recipe.image_url ? (
                                            <img src={recipe.image_url} alt={recipe.title} className="max-h-24" />
                                        ) : (
                                            <span>No image</span>
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell className="text-center">
                                    <Link href={`/recipes/${recipe.id}/edit`} className="mr-2" prefetch>
                                        <Button>Edit</Button>
                                    </Link>
                                    <Button
                                        onClick={() => {
                                            deleteRecipe(recipe.id);
                                        }}
                                        variant="destructive"
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </AppLayout>
    );
}
