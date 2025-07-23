import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create a recipe',
        href: '/recipes/create',
    },
];

type RecipeFormData = {
    title: string;
    description: string;
    ingredients: string;
    instructions: string;
    image: File | null;
};

export default function Recipes() {
    const { data, setData, post, processing, errors, reset } = useForm<RecipeFormData>({
        title: '',
        description: '',
        ingredients: '',
        instructions: '',
        image: null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('recipes.store'), {
            onSuccess: () => reset(),
            onError: () => console.error(errors),
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('image', file);
        }
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
                    <Label htmlFor="image">Image</Label>
                    <Input id="image" name="image" type="file" placeholder="Enter image URL" className="mt-1 w-full" onChange={handleImageChange} />
                </div>
                <Button type="submit">Create a recipe</Button>
            </form>
        </AppLayout>
    );
}
