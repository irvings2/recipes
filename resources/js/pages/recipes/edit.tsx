import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

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
    image: string | null; // Assuming image is a URL or null if not set
}

export default function Recipes({ recipe }: { recipe: Recipe }) {
    const [title, setTitle] = useState<string>(recipe.title);
    const [description, setDescription] = useState<string>(recipe.description);
    const [ingredients, setIngredients] = useState<string>(recipe.ingredients);
    const [instructions, setInstructions] = useState<string>(recipe.instructions);
    const [image, setImage] = useState<File | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.post(
            route('recipes.update', recipe.id),
            {
                title,
                description,
                ingredients,
                instructions,
                image, // Send null if no image is selected
                _method: 'PUT',
            },
            {
                forceFormData: true,
                onError: (errors) => console.error(errors),
            },
        );
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
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
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                        id="description"
                        name="description"
                        placeholder="Enter recipe description"
                        className="mt-1 w-full"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div>
                    <Label htmlFor="ingredients">Ingredients</Label>
                    <Textarea
                        id="ingredients"
                        name="ingredients"
                        placeholder="List ingredients"
                        className="mt-1 w-full"
                        value={ingredients}
                        onChange={(e) => setIngredients(e.target.value)}
                    />
                </div>
                <div>
                    <Label htmlFor="instructions">Instructions</Label>
                    <Textarea
                        id="instructions"
                        name="instructions"
                        placeholder="Enter cooking instructions"
                        className="mt-1 w-full"
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                    />
                </div>
                <div>
                    <Label htmlFor="image">Image</Label>
                    <Input id="image" name="image" type="file" placeholder="Enter image URL" className="mt-1 w-full" onChange={handleImageChange} />
                </div>
                <Button type="submit">Edit a recipe</Button>
            </form>
        </AppLayout>
    );
}
