import React from 'react';
import { motion } from 'framer-motion';

const StatsCard = ({ title, value, icon: Icon, color, description }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="glass bg-card/50 border border-border p-6 rounded-[2rem] shadow-xl shadow-primary/5 flex items-start justify-between group"
    >
      <div>
        <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
        <h3 className="text-3xl font-black tracking-tight">{value}</h3>
        {description && <p className="text-xs text-muted-foreground mt-2">{description}</p>}
      </div>
      <div className={`p-3 rounded-2xl ${color} bg-opacity-10 text-opacity-100 flex items-center justify-center transition-transform group-hover:scale-110 duration-300`}>
        <Icon size={24} className={color.replace('bg-', 'text-')} />
      </div>
    </motion.div>
  );
};

export default StatsCard;
