import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create a recipe',
        href: '/recipes/create',
    },
];

export default function Recipes() {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        description: '',
        ingredients: '',
        instructions: '',
        image: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('recipes.store'), {
            onSuccess: () => reset(),
            onError: () => console.error(errors),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Recipes" />

            <form onSubmit={handleSubmit} className="space-y-4 p-4">
                <div>
                    <Label htmlFor="title">Recipe Title</Label>
                    <Input
                        id="title"
                        name="title"
                        type="text"
                        placeholder="Enter recipe title"
                        className="mt-1 w-full"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                    />
                </div>
                <div>
                    <Label htmlFor="description">Description</Label>
                    <Input
                        id="description"
                        name="description"
                        type="text"
                        placeholder="Enter recipe description"
                        className="mt-1 w-full"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                    />
                </div>
                <div>
                    <Label htmlFor="ingredients">Ingredients</Label>
                    <Input
                        id="ingredients"
                        name="ingredients"
                        type="text"
                        placeholder="List ingredients"
                        className="mt-1 w-full"
                        value={data.ingredients}
                        onChange={(e) => setData('ingredients', e.target.value)}
                    />
                </div>
                <div>
                    <Label htmlFor="instructions">Instructions</Label>
                    <Input
                        id="instructions"
                        name="instructions"
                        type="text"
                        placeholder="Enter cooking instructions"
                        className="mt-1 w-full"
                        value={data.instructions}
                        onChange={(e) => setData('instructions', e.target.value)}
                    />
                </div>
                <div>
                    <Label htmlFor="image">Image URL</Label>
                    <Input
                        id="image"
                        name="image"
                        type="text"
                        placeholder="Enter image URL"
                        className="mt-1 w-full"
                        value={data.image}
                        onChange={(e) => setData('image', e.target.value)}
                    />
                </div>
                <Button type="submit">Create a recipe</Button>
            </form>
        </AppLayout>
    );
}
