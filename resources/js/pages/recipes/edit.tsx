import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Edit a recipe',
        href: '',
    },
];

interface Recipe {
    id: number;
    title: string;
    description: string;
    ingredients: string;
    instructions: string;
    image: string;
}

export default function Recipes({ ...props }: { recipe: Recipe }) {
    const { recipe } = props;

    const { data, setData, post, processing, errors, reset } = useForm({
        title: recipe.title,
        description: recipe.description,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
        image: recipe.image,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.put(route('recipes.update', recipe.id), data, {
            onSuccess: () => reset(),
            onError: (errors) => console.error(errors),
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
                    <Textarea
                        id="description"
                        name="description"
                        placeholder="Enter recipe description"
                        className="mt-1 w-full"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                    />
                </div>
                <div>
                    <Label htmlFor="ingredients">Ingredients</Label>
                    <Textarea
                        id="ingredients"
                        name="ingredients"
                        placeholder="List ingredients"
                        className="mt-1 w-full"
                        value={data.ingredients}
                        onChange={(e) => setData('ingredients', e.target.value)}
                    />
                </div>
                <div>
                    <Label htmlFor="instructions">Instructions</Label>
                    <Textarea
                        id="instructions"
                        name="instructions"
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
                <Button type="submit">Edit a recipe</Button>
            </form>
        </AppLayout>
    );
}
