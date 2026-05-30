"use client";

import React, { useCallback, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileText, ImageIcon, X, CheckCircle2 } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import LoadingOverlay from "@/components/LoadingOverlay";
import { UploadSchema } from "@/lib/zod";
import { voiceOptions, voiceCategories, DEFAULT_VOICE } from "@/lib/constants";
import type { BookUploadFormValues } from "@/types";

// ─── File Dropzone ────────────────────────────────────────────────────────────

interface DropzoneFieldProps {
  accept: string;
  value: File | undefined;
  onChange: (file: File | undefined) => void;
  icon: React.ElementType;
  label: string;
  hint: string;
  disabled?: boolean;
  id: string;
}

function DropzoneField({
  accept,
  value,
  onChange,
  icon: Icon,
  label,
  hint,
  disabled,
  id,
}: DropzoneFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFile = useCallback(
    (file: File | undefined) => {
      onChange(file);
    },
    [onChange],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      if (disabled) return;
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [disabled, handleFile],
  );

  const hasFile = !!value;

  return (
    <div
      id={id}
      role="button"
      tabIndex={0}
      aria-label={label}
      onClick={() => !disabled && inputRef.current?.click()}
      onKeyDown={(e) => {
        if ((e.key === "Enter" || e.key === " ") && !disabled)
          inputRef.current?.click();
      }}
      onDragOver={(e) => {
        e.preventDefault();
        if (!disabled) setIsDragOver(true);
      }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={handleDrop}
      className={[
        "upload-dropzone border-2 border-dashed transition-all",
        hasFile
          ? "upload-dropzone-uploaded border-[#8B7355]"
          : isDragOver
            ? "border-[#663820] bg-[#fff6e5]"
            : "border-[var(--border-medium)]",
        disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer",
      ].join(" ")}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        disabled={disabled}
        onChange={(e) => handleFile(e.target.files?.[0])}
      />

      {hasFile ? (
        <div className="flex flex-col items-center gap-2 px-4 text-center">
          <CheckCircle2 className="upload-dropzone-icon text-[#663820]" />
          <p className="upload-dropzone-text font-semibold text-[#663820] truncate max-w-[260px]">
            {value.name}
          </p>
          <button
            type="button"
            aria-label="Remove file"
            onClick={(e) => {
              e.stopPropagation();
              onChange(undefined);
              if (inputRef.current) inputRef.current.value = "";
            }}
            className="upload-dropzone-remove mt-1"
          >
            <X className="w-4 h-4" />
            <span className="text-xs ml-1">Remove</span>
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-1 px-4 text-center">
          <Icon className="upload-dropzone-icon" />
          <p className="upload-dropzone-text">{label}</p>
          <p className="upload-dropzone-hint">{hint}</p>
        </div>
      )}
    </div>
  );
}

// ─── Voice Radio Card ─────────────────────────────────────────────────────────

interface VoiceCardProps {
  voiceKey: string;
  selected: boolean;
  onSelect: () => void;
  disabled?: boolean;
}

function VoiceCard({ voiceKey, selected, onSelect, disabled }: VoiceCardProps) {
  const voice = voiceOptions[voiceKey as keyof typeof voiceOptions];
  if (!voice) return null;

  return (
    <label
      className={[
        "voice-selector-option",
        selected
          ? "voice-selector-option-selected"
          : "voice-selector-option-default",
        disabled ? "voice-selector-option-disabled" : "",
      ].join(" ")}
    >
      <input
        type="radio"
        name="voice"
        value={voiceKey}
        checked={selected}
        onChange={onSelect}
        disabled={disabled}
        className="sr-only"
      />
      <div className="flex flex-col gap-0.5 min-w-0">
        <span className="font-semibold text-[var(--text-primary)] text-base leading-5">
          {voice.name}
        </span>
        <span className="text-xs text-[var(--text-secondary)] leading-4 line-clamp-2">
          {voice.description}
        </span>
      </div>
      {selected && (
        <CheckCircle2 className="w-4 h-4 shrink-0 text-[#663820] ml-auto" />
      )}
    </label>
  );
}

// ─── Main Form ────────────────────────────────────────────────────────────────

export default function UploadForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<BookUploadFormValues>({
    resolver: zodResolver(UploadSchema),
    defaultValues: {
      title: "",
      author: "",
      voice: DEFAULT_VOICE,
      coverImage: undefined,
    },
  });

  async function onSubmit(values: BookUploadFormValues) {
    setIsSubmitting(true);
    try {
      // TODO: wire up upload action
      console.log("Submitting:", values);
      await new Promise((r) => setTimeout(r, 2000)); // placeholder
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  }

  const disabled = isSubmitting;

  return (
    <>
      {isSubmitting && <LoadingOverlay />}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="new-book-wrapper"
          aria-label="Upload book form"
        >
          <div className="space-y-8">

            {/* ── PDF Upload ── */}
            <FormField
              control={form.control}
              name="pdfFile"
              render={({ field }) => (
                <FormItem>
                  <label className="form-label" htmlFor="dropzone-pdf">
                    Upload Book PDF
                  </label>
                  <FormControl>
                    <DropzoneField
                      id="dropzone-pdf"
                      accept="application/pdf"
                      value={field.value}
                      onChange={field.onChange}
                      icon={FileText}
                      label="Click to upload PDF"
                      hint="PDF file (max 50MB)"
                      disabled={disabled}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* ── Cover Image Upload ── */}
            <FormField
              control={form.control}
              name="coverImage"
              render={({ field }) => (
                <FormItem>
                  <label className="form-label" htmlFor="dropzone-cover">
                    Upload Book Cover{" "}
                    <span className="text-sm font-normal text-[var(--text-secondary)]">
                      (optional)
                    </span>
                  </label>
                  <FormControl>
                    <DropzoneField
                      id="dropzone-cover"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      value={field.value}
                      onChange={field.onChange}
                      icon={ImageIcon}
                      label="Click to upload cover image"
                      hint="Leave empty to auto-generate from PDF"
                      disabled={disabled}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* ── Title ── */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <label className="form-label" htmlFor="input-title">
                    Title
                  </label>
                  <FormControl>
                    <input
                      id="input-title"
                      {...field}
                      disabled={disabled}
                      placeholder="ex: Rich Dad Poor Dad"
                      className="form-input border border-[var(--border-subtle)] focus:outline-none focus:ring-2 focus:ring-[#663820]/30 focus:border-[#663820] transition-all"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* ── Author ── */}
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <label className="form-label" htmlFor="input-author">
                    Author Name
                  </label>
                  <FormControl>
                    <input
                      id="input-author"
                      {...field}
                      disabled={disabled}
                      placeholder="ex: Robert Kiyosaki"
                      className="form-input border border-[var(--border-subtle)] focus:outline-none focus:ring-2 focus:ring-[#663820]/30 focus:border-[#663820] transition-all"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* ── Voice Selector ── */}
            <FormField
              control={form.control}
              name="voice"
              render={({ field }) => (
                <FormItem>
                  <label className="form-label">Choose Assistant Voice</label>

                  {/* Male voices */}
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wide">
                      Male Voices
                    </p>
                    <div className="voice-selector-options flex-wrap gap-3">
                      {voiceCategories.male.map((key) => (
                        <VoiceCard
                          key={key}
                          voiceKey={key}
                          selected={field.value === key}
                          onSelect={() => field.onChange(key)}
                          disabled={disabled}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Female voices */}
                  <div className="space-y-2 mt-4">
                    <p className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wide">
                      Female Voices
                    </p>
                    <div className="voice-selector-options flex-wrap gap-3">
                      {voiceCategories.female.map((key) => (
                        <VoiceCard
                          key={key}
                          voiceKey={key}
                          selected={field.value === key}
                          onSelect={() => field.onChange(key)}
                          disabled={disabled}
                        />
                      ))}
                    </div>
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* ── Submit ── */}
            <button
              id="btn-begin-synthesis"
              type="submit"
              disabled={disabled}
              className="form-btn disabled:opacity-60 disabled:cursor-not-allowed"
            >
              Begin Synthesis
            </button>
          </div>
        </form>
      </Form>
    </>
  );
}