import * as Lucide from 'lucide-react';

// All icons in this interface are decorative; controls provide their own names.
function decorativeIcon(Component) {
  return function DecorativeIcon(props) {
    return <Component {...props} aria-hidden="true" focusable="false" />;
  };
}
export const Accessibility = decorativeIcon(Lucide.Accessibility);
export const ArrowRight = decorativeIcon(Lucide.ArrowRight);
export const AudioLines = decorativeIcon(Lucide.AudioLines);
export const BookOpen = decorativeIcon(Lucide.BookOpen);
export const Bookmark = decorativeIcon(Lucide.Bookmark);
export const Check = decorativeIcon(Lucide.Check);
export const ChevronRight = decorativeIcon(Lucide.ChevronRight);
export const CircleHelp = decorativeIcon(Lucide.CircleHelp);
export const Contrast = decorativeIcon(Lucide.Contrast);
export const FileText = decorativeIcon(Lucide.FileText);
export const GraduationCap = decorativeIcon(Lucide.GraduationCap);
export const Heart = decorativeIcon(Lucide.Heart);
export const Home = decorativeIcon(Lucide.Home);
export const Keyboard = decorativeIcon(Lucide.Keyboard);
export const LayoutGrid = decorativeIcon(Lucide.LayoutGrid);
export const Leaf = decorativeIcon(Lucide.Leaf);
export const Moon = decorativeIcon(Lucide.Moon);
export const Palette = decorativeIcon(Lucide.Palette);
export const Search = decorativeIcon(Lucide.Search);
export const Settings2 = decorativeIcon(Lucide.Settings2);
export const ShieldCheck = decorativeIcon(Lucide.ShieldCheck);
export const SlidersHorizontal = decorativeIcon(Lucide.SlidersHorizontal);
export const Sparkles = decorativeIcon(Lucide.Sparkles);
export const Sprout = decorativeIcon(Lucide.Sprout);
export const Sun = decorativeIcon(Lucide.Sun);
export const Type = decorativeIcon(Lucide.Type);
export const Users = decorativeIcon(Lucide.Users);
export const Video = decorativeIcon(Lucide.Video);
export const X = decorativeIcon(Lucide.X);
