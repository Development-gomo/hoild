// src/lib/api/wp.js

// const WP_BASE = 'https://gomostaging.com/holid/wp-json/wp/v2'; // Base WordPress API URL (no trailing slash)
import {WP_BASE} from "../../config"
// Function to fetch page data based on slug
export const fetchPageData = async (slug) => {
  try {
    const response = await fetch(`${WP_BASE}/pages?slug=${encodeURIComponent(slug)}`);
    const data = await response.json();
    return data; // Return the page data (including ACF fields)
  } catch (error) {
    console.error('Error fetching data from WordPress:', error);
    throw error;
  }
};

// ✅ Function to fetch media data (image) by ID
export const fetchMediaById = async (id) => {
  try {
    if (!id) return null;

    const response = await fetch(`${WP_BASE}/media/${id}`);

    // If media not found or blocked, return null instead of crashing
    if (!response.ok) {
      console.warn(`Media not found for ID: ${id}`);
      return null;
    }

    const data = await response.json();
    return data; // Returns media object (includes source_url, media_details, etc.)
  } catch (error) {
    console.error('Error fetching media from WordPress:', error);
    return null; // Safe fallback
  }
};

// Function to fetch Service by slug
export async function fetchServiceBySlug(slug) {
  const res = await fetch(`${WP_BASE}/services?slug=${encodeURIComponent(slug)}`);
  const data = await res.json();
  return data?.[0] || null;
}

// Function to fetch Case Study by slug (similar to Service)
export async function fetchCaseStudyBySlug(slug) {
  const res = await fetch(`${WP_BASE}/case_study?slug=${encodeURIComponent(slug)}`);
  const data = await res.json();
  return data?.[0] || null;
}

