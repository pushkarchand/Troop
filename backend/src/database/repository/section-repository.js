const { SectionModel } = require("../models");

class SectionRepository {
  async CreateSection({ name, description, projectId, user }) {
    const section = new SectionModel({
      name,
      description,
      projectId,
      user,
      pages: [],
    });

    const sectionResult = await section.save();
    return sectionResult;
  }

  async UpdateSection({ id, name, description, pages }) {
    const updatedSection = await SectionModel.findByIdAndUpdate(
      id,
      { name, description, pages },
      { new: true }
    );
    return updatedSection;
  }

  async SectionDetails(id) {
    const section = await SectionModel.findOne({ localId: id }).populate("pages").exec();
    return section;
  }

  async FetchSectionById(id) {
    const section = await SectionModel.findById(id)
      .populate({
        path: "pages",
        model: "Page",
        populate: {
          path: "subPages",
          model: "SubPage",
        },
      })
      .exec();
    return section;
  }

  async FetchSections() {
    const sections = await SectionModel.find({}).populate("pages").exec();
    return sections;
  }

  async DeleteSection(id) {
    const deletedSection = await SectionModel.findByIdAndDelete(id);
    return deletedSection;
  }

  async DeleteMany(ids) {
    const deletedSections = await SectionModel.deleteMany({ _id: { $in: ids } });
    return deletedSections;
  }
}

module.exports = SectionRepository;
