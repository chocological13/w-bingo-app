"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { useForm } from "react-hook-form";
import { bingoFormSchema, BingoFormSchemaType } from "@/schema/bingoSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { MdArrowBackIos } from "react-icons/md";
import {
  bingoCategoryTemplates,
  generateBingoItems,
  generateRandomItems,
} from "@/utils/bingoItemGenerator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RefreshCcw } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface CreateBoardFormProps {
  onSubmit: (
    title: string,
    freeSpace: boolean,
    freeSpaceText: string,
    bukItems?: string
  ) => void;
  loading: boolean;
  setShowForm: (show: boolean) => void;
  boardPresent: boolean;
}

const CreateBoardForm: React.FC<CreateBoardFormProps> = ({
  onSubmit,
  loading,
  setShowForm,
  boardPresent,
}) => {
  const { playClickSound, playPopSound } = useSoundEffects();
  const [freeSpace, setFreeSpace] = useState<boolean>(false);
  const [generatedItems, setGeneratedItems] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const form = useForm<BingoFormSchemaType>({
    resolver: zodResolver(bingoFormSchema),
    defaultValues: {
      title: "",
      freeSpace: true,
      freeSpaceText: "FREE",
      bulkItems: "",
    },
    mode: "all",
    reValidateMode: "onChange",
  });

  const handleGenerateItems = (
    category?: keyof typeof bingoCategoryTemplates
  ) => {
    const items = category
      ? generateBingoItems(freeSpace, 25, category)
      : generateRandomItems(25, freeSpace);

    setGeneratedItems(items);
    form.setValue("bulkItems", items.join("\n"));
    playPopSound();
  };

  const handleSubmit = (values: BingoFormSchemaType) => {
    // Prioritize generated or manually entered items
    const items = values.bulkItems
      ? values.bulkItems.split("\n").filter((item) => item.trim() !== "")
      : generatedItems;

    // Ensure we have items
    if (items.length === 0) {
      handleGenerateItems();
      return;
    }

    playPopSound();
    onSubmit(
      values.title,
      values.freeSpace,
      values.freeSpaceText || "FREE",
      values.bulkItems
    );
  };

  const disabled =
    loading ||
    form.formState.isSubmitting ||
    !form.watch("title") ||
    !form.watch("bulkItems");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {boardPresent && (
        <div className="md:hidden flex justify-end w-full">
          <Button
            variant="link"
            onClick={() => setShowForm(false)}
            size="sm"
            className="text-xs"
          >
            <MdArrowBackIos /> Back To List
          </Button>
        </div>
      )}
      <Card className="w-full max-w-md mx-auto shadow-lg">
        <CardHeader className="flex flex-col items-start mb-2 md:mb-0">
          <div className="w-full flex md:flex-row flex-col-reverse justify-between items-center gap-2">
            <div className="w-full">
              <CardTitle className="font-heading text-primary-600 text-2xl">
                Create Bingo Board
              </CardTitle>
              <CardDescription>
                Customize your bingo board settings
              </CardDescription>
            </div>
            {boardPresent && (
              <Button
                variant="outline"
                onClick={() => setShowForm(false)}
                size="sm"
                className="hidden md:flex text-xs"
              >
                <MdArrowBackIos /> Back To List
              </Button>
            )}
          </div>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex flex-row gap-1">
                      <p>Board Title</p>
                      <p className="text-xs text-red-500">*required</p>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="My Awesome Bingo"
                        {...field}
                        className="placeholder:text-muted-forground"
                        onChange={(e) => {
                          field.onChange(e);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="freeSpace"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Free Space</FormLabel>
                      <FormDescription>
                        Add a free space in the center of the board
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={(checked) => {
                          field.onChange(checked);
                          playClickSound();
                          setFreeSpace(checked);
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {form.watch("freeSpace") && (
                <FormField
                  control={form.control}
                  name="freeSpaceText"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Free Space Text</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="FREE"
                          {...field}
                          className="placeholder:text-muted-forground"
                          onChange={(e) => {
                            field.onChange(e);
                            playClickSound();
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="bulkItems"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between items-center">
                      <FormLabel className="flex md:flex-row flex-col gap-1">
                        <p className="w-full">Bingo Items (one per line)</p>
                        <div className="flex justify-start w-full md:w-fit">
                          <p className="text-xs text-red-500">*required</p>
                        </div>
                      </FormLabel>
                      <div className="flex justify-end">
                        <Button
                          type="button"
                          variant="destructive"
                          onClick={() => {
                            form.setValue("bulkItems", ""); // Reset the field
                            setGeneratedItems([]);
                          }}
                          className="text-xs px-2 py-0 md:py-2 h-4"
                          size="sm"
                        >
                          Reset
                        </Button>
                      </div>
                    </div>
                    <FormControl>
                      <Textarea
                        placeholder={`Enter one bingo item per line
\nExample:\nWatch a movie\nEat ice cream\nCall a friend\nGo for a walk\nRead a book`}
                        className="min-h-40 placeholder:text-muted-forground"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                        }}
                        value={field.value || generatedItems.join("\n")}
                      />
                    </FormControl>
                    <FormDescription>
                      {generatedItems.length > 0
                        ? "Items randomly generated"
                        : "Items will be randomly assigned to the board"}
                    </FormDescription>
                    <FormMessage />
                    <div className="grid grid-cols-[5fr_1fr_5fr] items-center font-bold text-center">
                      <Separator style={{ height: 1 }} />
                      <p>OR</p>
                      <Separator style={{ height: 1 }} />
                    </div>
                    <p className="text-sm text-center">Generate Random Items</p>
                    <div className="flex items-center justify-center space-x-2">
                      <Select
                        value={selectedCategory || undefined}
                        onValueChange={(value) => {
                          setSelectedCategory(value);
                          handleGenerateItems(
                            value as keyof typeof bingoCategoryTemplates
                          );
                        }}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.keys(bingoCategoryTemplates).map(
                            (category) => (
                              <SelectItem key={category} value={category}>
                                {category
                                  .replace(/([a-z])([A-Z])/g, "$1 $2")
                                  .replace(/^./, (str) => str.toUpperCase())}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => handleGenerateItems()}
                        title="Generate Random Items"
                      >
                        <RefreshCcw className="h-4 w-4" />
                      </Button>
                    </div>
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full font-alt-heading"
                disabled={disabled}
                onClick={() => playClickSound()}
              >
                Create Board
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CreateBoardForm;
