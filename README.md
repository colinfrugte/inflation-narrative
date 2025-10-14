# 🧠 Economic Narratives of Inflation — Master’s Thesis Project

This repository contains the code and experimental framework for my master’s thesis at the University of Hamburg, focusing on **extracting and visualizing economic narratives about inflation** using **Large Language Models (LLMs)** and **graph-based representations**.

---

## 📘 Overview

Economic narratives—how people *explain* macroeconomic phenomena like inflation—shape public perception and policy expectations.  
This project explores how modern NLP techniques can automatically extract such narratives from open-ended survey responses and transform them into **graph structures** of interconnected economic concepts.

Each **node** represents a concept (e.g., “war”, “energy prices”, “ECB policy”), while **edges** capture causal relations between them (e.g., *“war → supply shortages”*).

---

## 🧩 Research Goals

1. **Extract economic concepts** from textual survey responses  
2. **Identify causal relations** between these concepts  
3. **Represent and visualize** the results as a semantic graph  
4. **Evaluate** the accuracy, recall, and structure of extracted narratives  

---

## ⚙️ Architecture

The pipeline combines multiple NLP components:

- **Node Extraction:**  
  - Fine-tuned BERT-based multi-label classifier  
  - Zero-shot extraction using [GLiNER](https://huggingface.co/urchade/gliner-large)  
  - Experiments with SetFit for small data scenarios  

- **Edge (Relation) Extraction:**  
  - Cross-Encoder model predicting causal links between detected nodes  
  - Comparison of pattern-based, QA-based, and similarity-based approaches  

- **Graph Construction:**  
  - Nodes and edges aggregated into interpretable narrative graphs  
  - Interactive visualization with React/Next.js frontend  

---

## 📊 Evaluation

Metrics include:
- **Concept recall** (coverage of relevant narrative elements)
- **Edge precision** (accuracy of detected causal relations)
- **Micro-F1** for end-to-end performance  
- Analysis of **long-tailed label distributions** to assess model robustness  

---

## 🧠 Technologies

| Category | Tools |
|-----------|-------|
| **Modeling** | PyTorch, Hugging Face Transformers, SetFit, GLiNER |
| **Data Handling** | Pandas, Scikit-learn |
| **Visualization** | React, Next.js, TailwindCSS, vis-network |
| **Environment** | Conda, SEMS GPU Cluster (Uni Hamburg) |

---

## 🧭 Repository Structure
