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

interface CreateBoardFormProps {
  onSubmit: (
    title: string,
    freeSpace: boolean,
    freeSpaceText: string,
    bukItems?: string
  ) => void;
  setShowForm: (show: boolean) => void;
  boardPresent: boolean;
}

const CreateBoardForm: React.FC<CreateBoardFormProps> = ({
  onSubmit,
  setShowForm,
  boardPresent,
}) => {
  const { playClickSound, playPopSound } = useSoundEffects();
  const [bulkEntryMode, setBulkEntryMode] = useState<boolean>(false);

  const form = useForm<BingoFormSchemaType>({
    resolver: zodResolver(bingoFormSchema),
    defaultValues: {
      title: "",
      freeSpace: true,
      freeSpaceText: "FREE",
      bulkItems: "",
    },
  });

  const handleSubmit = (values: BingoFormSchemaType) => {
    playPopSound();
    onSubmit(
      values.title,
      values.freeSpace,
      values.freeSpaceText || "FREE",
      values.bulkItems
    );
  };

  const disabled =
    // loading ||
    form.formState.isSubmitting ||
    !form.watch("title") ||
    !form.formState.isValid;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="w-full max-w-md mx-auto shadow-lg">
        <CardHeader className="flex flex-col items-start">
          <div className="w-full flex justify-between items-center">
            <div>
              <CardTitle className="font-heading text-primary-600 text-2xl">
                Create Bingo Board
              </CardTitle>
              <CardDescription>
                Customize your bingo board settings
              </CardDescription>
            </div>
            {boardPresent && (
              <Button variant="outline" onClick={() => setShowForm(false)}>
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
                    <FormLabel>Board Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="My Awesome Bingo"
                        {...field}
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

              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Bulk Entry Mode</FormLabel>
                  <FormDescription>
                    Enter multiple bingo items at once (one per line)
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={bulkEntryMode}
                    onCheckedChange={(checked) => {
                      setBulkEntryMode(checked);
                      playClickSound();
                    }}
                  />
                </FormControl>
              </FormItem>

              {bulkEntryMode && (
                <FormField
                  control={form.control}
                  name="bulkItems"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bingo Items (one per line)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter one bingo item per line"
                          className="min-h-40"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                          }}
                        />
                      </FormControl>
                      <FormDescription>
                        Items will be randomly assigned to the board
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

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
