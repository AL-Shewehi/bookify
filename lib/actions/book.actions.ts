"use server";
import { CreateBook, TextSegment } from "@/types";
import { connectToDatabase } from "@/database/mongoose";
import Book from "@/database/models/book.model";
import { generateSlug, serializeData } from "../utils";
import BookSegment from "@/database/models/book-segment.model";


export const getAllBooks = async () => {
    try {
        await connectToDatabase()

        const books = await Book.find().sort({ createdAt: -1 }).lean()

        return { success: true, data: serializeData(books) }
    } catch (error) {
        console.error('Failed to get all books:', error);
        return { success: false, error: error instanceof Error ? error.message : 'Internal server error' }
    }
}

export const checkBookExists = async (title: string) => {
    try {
        await connectToDatabase()

        const slug = generateSlug(title)

        const existingBook = await Book.findOne({ slug }).lean();

        if (existingBook) {
            return {
                exists: true,
                book: serializeData(existingBook)
            }
        }

        return {
            exists: false
        }

    } catch (error) {
        console.error('Failed to check book existence:', error);
        return {
            exists: false,
            error: error instanceof Error ? error.message : 'Internal server error'
        }
    }
}


export const createBook = async (data: CreateBook) => {
    try {
        await connectToDatabase()

        const slug = generateSlug(data.title)

        const existingBook = await Book.findOne({ slug }).lean();

        if (existingBook) {
            return {
                success: true,
                data: serializeData(existingBook),
                alreadyExists: true
            }
        }

        // Todo: Check subscrtiption limits before creating a new book

        const book = await Book.create({ ...data, slug, totalSegments: 0 })

        return {
            success: true,
            data: serializeData(book)
        }


    } catch (error) {
        console.error('Failed to create book:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Internal server error',
        }
    }
}

export const saveBookSegments = async (bookId: string, clerkId: string, segments: TextSegment[]) => {
    try {
        await connectToDatabase();

        console.log('Saving book segments...');
        const segmentsToInsert = segments.map(({ text, segmentIndex, pageNumber, wordCount }) => ({
            clerkId, bookId, content: text, segmentIndex, pageNumber, wordCount
        }))

        await BookSegment.insertMany(segmentsToInsert)

        await Book.findByIdAndUpdate(bookId, { totalSegments: segments.length })

        console.log(`Successfully saved ${segments.length} segments to book: ${bookId}`);

        return { success: true, data: { segmantsCreated: segments.length } }

    } catch (error) {
        console.error('Failed to save book segments:', error);
        await BookSegment.deleteMany({ bookId })
        await Book.findByIdAndDelete(bookId)
        console.log(`Cleaned up book: ${bookId}`);
        return { success: false, error: error instanceof Error ? error.message : 'Internal server error' }
    }
}