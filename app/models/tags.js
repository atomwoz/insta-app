export let TAGS = ["love", "instagood", "fashion", "instagram", "photooftheday", "art", "photography", "beautiful", "nature", "picoftheday", "travel", "happy", "cute", "instadaily", "style", "tbt", "repost", "followme", "summer", "reels", "like4like", "beauty", "fitness", "food"]

export function putTag(tag) {
    if (!TAGS.includes(tag)) {
        TAGS.push(tag);
    }
}